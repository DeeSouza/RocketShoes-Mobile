import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const ProductList = styled.FlatList``;

export const ProductItemList = styled.View`
	flex-direction: column;
	background: #fff;
	border-radius: 4px;
	padding: 20px;
`;

export const Title = styled.Text`
	font-size: 16px;
	line-height: 20px;
	color: #333;
	margin-top: 5px;
`;

export const Price = styled.Text`
	font-size: 21px;
	font-weight: bold;
	margin: 5px 0px 20px;
`;

export const NoProducts = styled.View`
	color: #fff;
	font-size: 16px;
	background-color: #333;
	padding: 10px 15px;
	border-radius: 4px;
	display: flex;
	align-items: center;
`;

export const AddButton = styled(RectButton)`
	background: #7159c1;
	color: #fff;
	border: 0;
	border-radius: 4px;
	overflow: hidden;
	margin-top: auto;
	display: flex;
	align-items: center;
`;

export const Amount = styled.View`
	align-items: center;
	padding: 12px;
	background-color: rgba(0, 0, 0, 0.1);
`;

export const AmountNumber = styled.Text`
	font-size: 13px;
`;

export const AddCartText = styled.Text`
	flex: 1;
	text-align: center;
	font-weight: bolder;
`;
