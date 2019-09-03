import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import * as CartActions from '../../store/modules/cart/actions';

import {
	Container,
	Products,
	Product,
	ProductInfo,
	ProductImage,
	ProductDetails,
	ProductTitle,
	ProductPrice,
	ProductDelete,
	ProductControls,
	ProductControlButton,
	ProductAmount,
	ProductSubtotal,
	TotalContainer,
	TotalText,
	TotalAmount,
	Order,
	OrderText,
	EmptyContainer,
	EmptyText,
} from './styles';

function Cart({
	navigation,
	cart,
	total,
	removeFromCart,
	updateAmountRequest,
}) {
	function decrement(product) {
		updateAmountRequest(product.id, product.amount - 1);
	}

	function increment(product) {
		updateAmountRequest(product.id, product.amount + 1);
	}

	return (
		<Container>
			{cart.length ? (
				<>
					<Products>
						{cart.map(product => (
							<Product key={product.id}>
								<ProductInfo>
									<ProductImage
										source={{ uri: product.image }}
									/>
									<ProductDetails>
										<ProductTitle>
											{product.title}
										</ProductTitle>
										<ProductPrice>
											{product.priceFormatted}
										</ProductPrice>
									</ProductDetails>
									<ProductDelete
										onPress={() =>
											removeFromCart(product.id)
										}
									>
										<Icon
											name="delete-forever"
											size={24}
											color="#7159c1"
										/>
									</ProductDelete>
								</ProductInfo>
								<ProductControls>
									<ProductControlButton
										onPress={() => decrement(product)}
									>
										<Icon
											name="remove-circle-outline"
											size={20}
											color="#7159c1"
										/>
									</ProductControlButton>
									<ProductAmount
										value={String(product.amount)}
									/>
									<ProductControlButton
										onPress={() => increment(product)}
									>
										<Icon
											name="add-circle-outline"
											size={20}
											color="#7159c1"
										/>
									</ProductControlButton>
									<ProductSubtotal>
										{product.subtotal}
									</ProductSubtotal>
								</ProductControls>
							</Product>
						))}
					</Products>
					<TotalContainer>
						<TotalText>TOTAL</TotalText>
						<TotalAmount>{total}</TotalAmount>
						<Order>
							<OrderText>FINALIZAR PEDIDO</OrderText>
						</Order>
					</TotalContainer>
				</>
			) : (
				<EmptyContainer>
					<Icon name="remove-shopping-cart" size={64} color="#eee" />
					<EmptyText>Seu carrinho está vazio.</EmptyText>
				</EmptyContainer>
			)}
		</Container>
	);
}

const mapStateToProps = state => ({
	cart: state.cart.map(product => ({
		...product,
		subtotal: Numeral(product.price * product.amount).format('$ 0.00'),
		priceFormatted: Numeral(product.price).format('$ 0.00'),
	})),
	total: Numeral(
		state.cart.reduce(
			(total, product) => total + product.price * product.amount,
			0
		)
	).format('$ 0.00'),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(CartActions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart);

Cart.propTypes = {
	cart: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			amount: PropTypes.number,
			title: PropTypes.string,
			priceFormmated: PropTypes.string,
			image: PropTypes.string,
		})
	).isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	removeFromCart: PropTypes.func.isRequired,
	updateAmountRequest: PropTypes.func.isRequired,
	total: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
