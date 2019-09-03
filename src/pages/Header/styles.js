import styled from 'styled-components/native';
import logo from '../../assets/images/logo.png';

export const WrapperContainer = styled.SafeAreaView`
	background: #000000;
	flex-direction: row;
`;

export const Container = styled.View`
	flex-direction: row;
	flex: 1;
	justify-content: space-between;
	padding: 20px;
`;

export const LogoRocket = styled.Image.attrs({
	source: logo,
	resizeMode: 'cover',
})`
	width: 185px;
	height: 24px;
`;

export const BasketCart = styled.TouchableOpacity`
	height: 24px;
	width: 24px;
	flex: 1;
	align-items: flex-end;
	justify-content: flex-end;
`;

export const CartSize = styled.Text`
	position: absolute;
	text-align: center;
	top: -8px;
	right: -8px;
	min-width: 18px;
	min-height: 18px;
	background: #7159c1;
	color: #fff;
	font-size: 12px;
	padding: 2px;
	border-radius: 9px;
	overflow: hidden;
`;
