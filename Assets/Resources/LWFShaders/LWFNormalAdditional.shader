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

Shader "LWF/NormalAdditional" {
	Properties {
		_Color ("Color", Color) = (1, 1, 1, 1)
		_AdditionalColor ("AdditionalColor", Color) = (0, 0, 0, 0)
		_MainTex ("Texture", 2D) = "white" {}
	}

	SubShader {
		Tags {
			"Queue" = "Transparent"
			"IgnoreProjector" = "True"
		}
		Cull Off
		ZWrite Off
		Blend SrcAlpha OneMinusSrcAlpha
		Pass {
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#include "UnityCG.cginc"
			sampler2D _MainTex;
			half4 _MainTex_ST;
			fixed4 _Color;
			fixed4 _AdditionalColor;
			struct v2f {
				half4 pos: SV_POSITION;
				half2 uv: TEXCOORD0;
				fixed4 color: COLOR;
				fixed4 additionalColor;
			};
			v2f vert(appdata_full v)
			{
				v2f o;
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
				o.uv.xy = TRANSFORM_TEX(v.texcoord, _MainTex);
				o.color = v.color * _Color;
				o.additionalColor = _AdditionalColor;
				return o;
			}
			fixed4 frag(v2f i): COLOR
			{
				return tex2D(_MainTex, i.uv.xy) * i.color + i.additionalColor;
			}
			ENDCG
		}
	}
}
