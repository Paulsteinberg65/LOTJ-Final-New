/*
 * Copyright (C) 2012 GREE, Inc.
 * 
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

using UnityEngine;

using ResourceCache = LWF.UnityRenderer.ResourceCache;
using MeshContext = LWF.UnityRenderer.MeshContext;

namespace LWF {
namespace DrawMeshRenderer {

public partial class Factory : IRendererFactory
{
	private BitmapContext[] m_bitmapContexts;
	private BitmapContext[] m_bitmapExContexts;

	private void CreateBitmapContexts(Data data)
	{
		m_bitmapContexts = new BitmapContext[data.bitmaps.Length];
		for (int i = 0; i < data.bitmaps.Length; ++i) {
			Format.Bitmap bitmap = data.bitmaps[i];
			// Ignore null texture
			if (bitmap.textureFragmentId == -1)
				continue;
			int bitmapExId = -i - 1;
			Format.BitmapEx bitmapEx = new Format.BitmapEx();
			bitmapEx.matrixId = bitmap.matrixId;
			bitmapEx.textureFragmentId = bitmap.textureFragmentId;
			bitmapEx.u = 0;
			bitmapEx.v = 0;
			bitmapEx.w = 1;
			bitmapEx.h = 1;
			m_bitmapContexts[i] =
				new BitmapContext(this, data, bitmapEx, bitmapExId);
		}

		m_bitmapExContexts = new BitmapContext[data.bitmapExs.Length];
		for (int i = 0; i < data.bitmapExs.Length; ++i) {
			Format.BitmapEx bitmapEx = data.bitmapExs[i];
			// Ignore null texture
			if (bitmapEx.textureFragmentId == -1)
				continue;
			m_bitmapExContexts[i] = new BitmapContext(this, data, bitmapEx, i);
		}
	}

	public override void Destruct()
	{
		for (int i = 0; i < m_bitmapContexts.Length; ++i)
			if (m_bitmapContexts[i] != null)
				m_bitmapContexts[i].Destruct();
		for (int i = 0; i < m_bitmapExContexts.Length; ++i)
			if (m_bitmapExContexts[i] != null)
				m_bitmapExContexts[i].Destruct();
		base.Destruct();
	}
}

public class BitmapContext
{
	private Factory m_factory;
	private Material m_material;
	private Mesh m_mesh;
	private Data m_data;
	private float m_height;
	private string m_textureName;
	private int m_bitmapExId;
	private bool m_premultipliedAlpha;

	public Factory factory {get {return m_factory;}}
	public Material material {get {return m_material;}}
	public Mesh mesh {get {return m_mesh;}}
	public float height {get {return m_height;}}
	public int bitmapExId {get {return m_bitmapExId;}}
	public bool premultipliedAlpha {get {return m_premultipliedAlpha;}}

	public BitmapContext(Factory factory,
		Data data, Format.BitmapEx bitmapEx, int bitmapExId)
	{
		m_factory = factory;
		m_data = data;
		m_bitmapExId = bitmapExId;

		Format.TextureFragment fragment =
			data.textureFragments[bitmapEx.textureFragmentId];
		Format.Texture texture = data.textures[fragment.textureId];

		m_textureName = factory.texturePrefix + texture.filename;
		m_premultipliedAlpha = (texture.format ==
			(int)Format.Constant.TEXTUREFORMAT_PREMULTIPLIEDALPHA);

		m_material = ResourceCache.SharedInstance().LoadTexture(
			data.name, m_textureName, texture.format, false,
			factory.useAdditionalColor, factory.textureLoader,
			factory.textureUnloader);
		if (factory.renderQueueOffset != 0)
			m_material.renderQueue += factory.renderQueueOffset;

		MeshContext c = ResourceCache.SharedInstance().LoadMesh(
			data.name, data, bitmapEx, bitmapExId);
		m_mesh = c.mesh;
		m_height = c.height;
	}

	public void Destruct()
	{
		ResourceCache.SharedInstance().UnloadMesh(
			m_data.name, m_bitmapExId);
		ResourceCache.SharedInstance().UnloadTexture(
			m_data.name, m_textureName);
	}
}

public class BitmapRenderer : Renderer
{
	BitmapContext m_context;
	MaterialPropertyBlock m_property;
	Material m_additiveMaterial;
	Matrix4x4 m_matrix;
	Matrix4x4 m_renderMatrix;
	UnityEngine.Color m_colorMult;
	UnityEngine.Color m_colorAdd;
#if UNITY_EDITOR
	bool m_visible;
#endif

	public BitmapRenderer(LWF lwf, BitmapContext context) : base(lwf)
	{
		m_context = context;
		m_property = new MaterialPropertyBlock();
		m_matrix = new Matrix4x4();
		m_renderMatrix = new Matrix4x4();
		m_colorMult = new UnityEngine.Color();
		m_colorAdd = new UnityEngine.Color();
	}

	public override void Destruct()
	{
		if (m_additiveMaterial != null) {
			Material.Destroy(m_additiveMaterial);
			m_additiveMaterial = null;
		}
		base.Destruct();
	}

	public override void Render(Matrix matrix, ColorTransform colorTransform,
		int renderingIndex, int renderingCount, bool visible)
	{
		// Ignore null texture
#if UNITY_EDITOR
		m_visible = visible;
#endif
		if (m_context == null || !visible)
			return;

		Factory factory = m_context.factory;
		factory.ConvertColorTransform(
			ref m_colorMult, ref m_colorAdd, colorTransform);
		if (m_colorMult.a <= 0)
			return;
		if (m_context.premultipliedAlpha) {
			m_colorMult.r *= m_colorMult.a;
			m_colorMult.g *= m_colorMult.a;
			m_colorMult.b *= m_colorMult.a;
		}

		factory.ConvertMatrix(ref m_matrix, matrix, 1,
			renderingCount - renderingIndex, m_context.height);
		Factory.MultiplyMatrix(ref m_renderMatrix,
			factory.gameObject.transform.localToWorldMatrix, m_matrix);

		m_property.Clear();
		m_property.AddColor("_Color", m_colorMult);
		if (factory.useAdditionalColor)
			m_property.AddColor("_AdditionalColor", m_colorAdd);

		if (factory.blendMode == (int)Format.Constant.BLEND_MODE_ADD) {
			if (m_additiveMaterial == null) {
				m_additiveMaterial = new Material(m_context.material);
				m_additiveMaterial.shader =
					ResourceCache.SharedInstance().GetAdditiveShader(
						m_context.material.shader);
			}
			Graphics.DrawMesh(m_context.mesh, m_renderMatrix,
				m_additiveMaterial, factory.gameObject.layer, factory.camera, 0,
				m_property);
		} else {
			Graphics.DrawMesh(m_context.mesh, m_renderMatrix,
				m_context.material, factory.gameObject.layer, factory.camera, 0,
				m_property);
		}
	}

#if UNITY_EDITOR
	public override void RenderNow()
	{
		if (m_context == null || !m_visible)
			return;

		Material material = new Material(m_context.material);
		material.color = m_colorMult;
		if (m_context.factory.useAdditionalColor)
			material.SetColor("_AdditionalColor", m_colorAdd);
		material.SetPass(0);
		Graphics.DrawMeshNow(m_context.mesh, m_renderMatrix);
		if (!Application.isEditor)
			Material.Destroy(material);
	}
#endif
}

}	// namespace DrawMeshRenderer
}	// namespace LWF
