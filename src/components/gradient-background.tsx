import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
	Defs,
	LinearGradient,
	RadialGradient,
	Stop,
	Rect,
	Circle,
} from "react-native-svg";

type Blob = {
	x: number; 
	y: number; 
	r: number; 
	color: string;
	opacity?: number;
};

type Props = {
	topColor: string;
	bottomColor: string;
	blobs?: Blob[];
};

const GradientBackground = ({
	topColor,
	bottomColor,
	blobs = [],
}: Props) => {
	return (
		<View style={StyleSheet.absoluteFill}>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
			>
				<Defs>
					{/* Linear Background */}
					<LinearGradient 
						id="bg" 
						x1="0" 
						y1="0" 
						x2="0" 
						y2="100"
						gradientUnits="userSpaceOnUse"
					>
						<Stop offset="0" stopColor={topColor} />
						<Stop offset="1" stopColor={bottomColor} />
					</LinearGradient>

				</Defs>

				{/* Base */}
				<Rect x="0" y="0" width="100" height="100" fill="url(#bg)" />
			</Svg>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 100 100"
				style={StyleSheet.absoluteFill}
			>
				<Defs>
					{blobs.map((b, i) => (
						<RadialGradient
							key={i}
							id={`blob${i}`}
							cx={b.x}
							cy={b.y}
							r={b.r}
							gradientUnits="userSpaceOnUse"
						>
							<Stop offset="0" stopColor={b.color} stopOpacity={b.opacity} />
							<Stop offset="1" stopColor={b.color} stopOpacity="0" />
						</RadialGradient>
					))}
				</Defs>

				{blobs.map((b, i) => (
					<Circle
						key={i}
						cx={b.x}
						cy={b.y}
						r={b.r}
						fill={`url(#blob${i})`}
					/>
				))}
			</Svg>

		</View>
	);
};

export default GradientBackground;
