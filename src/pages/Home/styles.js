import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
	background: #000000;
`;

export const ProductItemList = styled.View`
	background: #fff;
	padding: 10px;
	margin: 15px;
	border-radius: 4px;
	width: 220px;
`;

export const ProductImage = styled.Image`
	height: 200px;
	width: 200px;
`;

export const Title = styled.Text`
	font-size: 16px;
`;

export const Price = styled.Text`
	margin: 14px 0px;
	font-size: 20px;
	margin-bottom: 14px;
	font-weight: bold;
`;

export const NoProducts = styled.TouchableOpacity`
	color: #fff;
	font-size: 16px;
	background-color: #7159c1;
	padding: 10px 15px;
	border-radius: 4px;
	align-items: center;
	margin: 20px;
`;

export const NoProductsText = styled.Text`
	font-size: 15px;
	color: #fff;
	margin-top: 10px;
`;

export const AddButton = styled.TouchableOpacity`
	background: #7159c1;
	flex-direction: row;
	align-items: center;
	border-radius: 4px;
	margin-top: auto;
`;

export const Amount = styled.View`
	padding: 12px;
	background: ${darken(0.03, '#7159c1')};
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	flex-direction: row;
	align-items: center;
`;

export const AmountNumber = styled.Text`
	color: #fff;
	margin: 0px 4px 0px 10px;
`;

export const AddCartText = styled.Text`
	flex: 1;
	text-align: center;
	font-weight: 700;
	color: #fff;
`;
