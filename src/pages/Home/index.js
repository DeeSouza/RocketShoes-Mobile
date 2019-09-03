import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import { FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import {
	Container,
	NoProducts,
	NoProductsText,
	ProductItemList,
	Title,
	Price,
	AddButton,
	Amount,
	AmountNumber,
	ProductImage,
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
			priceFormatted: Numeral(product.price).format('$ 0.00'),
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
		const { amount, loadingAmount, navigation } = this.props;

		return (
			<Container>
				<FlatList
					horizontal
					keyExtractor={product => String(product.id)}
					extraData={[this.props, id]}
					data={products}
					renderItem={({ item }) => (
						<ProductItemList key={String(item.id)}>
							<ProductImage source={{ uri: item.image }} />
							<Title>{item.title}</Title>
							<Price>{item.priceFormatted}</Price>

							<AddButton
								onPress={() => this.handleAddProduct(item.id)}
							>
								<Amount>
									{!loadingAmount[item.id] &&
									id === item.id ? (
										<ActivityIndicator
											size={16}
											color="#FFF"
										/>
									) : (
										<Icon
											name="add-shopping-cart"
											size={16}
											color="#FFF"
										/>
									)}
									<AmountNumber>
										{amount[item.id] || 0}
									</AmountNumber>
								</Amount>

								<AddCartText>ADICIONAR</AddCartText>
							</AddButton>
						</ProductItemList>
					)}
				/>

				{!loading && products.length === 0 && (
					<NoProducts onPress={() => navigation.navigate('Cart')}>
						<Icon name="info" size={25} color="#FFF" />
						<NoProductsText>
							Que pena, vendemos todo nosso estoque!
						</NoProductsText>
					</NoProducts>
				)}

				{loading && <ActivityIndicator size="large" color="#FFF" />}
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
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};
