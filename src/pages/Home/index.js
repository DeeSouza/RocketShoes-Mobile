import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart, MdInfo } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import { FlatList, Text, Image, ActivityIndicator } from 'react-native';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import {
	Container,
	ProductList,
	NoProducts,
	ProductItemList,
	Title,
	Price,
	AddButton,
	Amount,
	AmountNumber,
	AddCartText,
} from './styles';

class Home extends Component {
	state = {
		products: [],
		loading: true,
		id: 0,
	};

	async componentDidMount() {
		const response = await api.get('products');

		const data = response.data.map(product => ({
			...product,
			priceFormatted: Numeral(product.price).format('$0.00'),
			loadingAmount: true,
		}));

		this.setState({
			products: data,
			loading: false,
		});
	}

	handleAddProduct = id => {
		const { addToCartRequest } = this.props;

		this.setState({ id });

		addToCartRequest(id);
	};

	render() {
		const { products, loading, id } = this.state;
		const { amount, loadingAmount } = this.props;

		return (
			<Container>
				<ProductList>
					<FlatList
						keyExtractor={product => String(product.id)}
						data={products}
						renderItem={({ product }) => (
							<ProductItemList>
								<Image source={{ uri: product.image }} />

								<Title>{product.title}</Title>
								<Price>{product.priceFormatted}</Price>

								<AddButton
									type="button"
									onClick={() =>
										this.handleAddProduct(product.id)
									}
								>
									<Amount>
										{!loadingAmount[product.id] &&
										id === product.id ? (
											<FaSpinner
												className="spin"
												color="#FFF"
												size={16}
											/>
										) : (
											<MdAddShoppingCart
												size={16}
												color="#FFF"
											/>
										)}{' '}
										<AmountNumber>
											{amount[product.id] || 0}
										</AmountNumber>
									</Amount>

									<AddCartText>
										ADICIONAR AO CARRINHO
									</AddCartText>
								</AddButton>
							</ProductItemList>
						)}
					/>
				</ProductList>

				{!loading && products.length === 0 && (
					<NoProducts>
						<MdInfo size={25} color="#FFF" />
						<Text>Que pena, vendemos todo nosso estoque!</Text>
					</NoProducts>
				)}

				{loading && <ActivityIndicator size="small" color="#FFF" />}
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		amount: state.cart.reduce((amount, product) => {
			amount[product.id] = product.amount;

			return amount;
		}, {}),
		loadingAmount: state.cart.reduce((loadingAmount, product) => {
			loadingAmount[product.id] = product.loadingAmount || false;

			return loadingAmount;
		}, {}),
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(CartActions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

Home.propTypes = {
	addToCartRequest: PropTypes.func.isRequired,
	amount: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
		.isRequired,
	loadingAmount: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
		.isRequired,
};
