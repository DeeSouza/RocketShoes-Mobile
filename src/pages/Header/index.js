import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
	WrapperContainer,
	Container,
	Cart,
	CartSize,
	LogoRocket,
} from './styles';

function Header({ cartSize, navigation }) {
	return (
		<WrapperContainer>
			<Container>
				<LogoRocket />
				<Cart onPress={() => navigation.navigate('Cart')}>
					<Icon name="shopping-basket" size={24} color="#FFF" />
					<CartSize>{cartSize || 0}</CartSize>
				</Cart>
			</Container>
		</WrapperContainer>
	);
}

Header.propTypes = {
	cartSize: PropTypes.number.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};

export default connect(state => ({
	cartSize: state.cart.length,
}))(Header);
