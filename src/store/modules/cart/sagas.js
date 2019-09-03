import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import Numeral from 'numeral';
import api from '../../../services/api';
import { addToCartSuccess, updateAmountSuccess } from './actions';

/**
 * Funcionalidade do JS (Generator)
 * Async/Await (Basicamente)
 */
function* addToCart({ id }) {
	// SELECT busca informações do estado
	const productExists = yield select(state =>
		state.cart.find(p => p.id === id)
	);

	// Check stock
	const stock = yield call(api.get, `/stock/${id}`);

	const stockAmount = stock.data.amount;
	const currentAmount = productExists ? productExists.amount : 0;

	const amount = currentAmount + 1;

	if (amount > stockAmount) {
		// Erro
		return;
	}

	if (productExists) {
		yield put(updateAmountSuccess(id, amount));
	} else {
		// Como se fosse o await
		const response = yield call(api.get, `/products/${id}`);

		const data = {
			...response.data,
			amount: 1,
			priceFormatted: Numeral(response.data.price).format('$ 0.00'),
			loadingAmount: true,
		};

		// PUT dispara actions
		yield put(addToCartSuccess(data));
	}
}

function* updateAmount({ id, amount }) {
	if (amount <= 0) return;

	const stock = yield call(api.get, `stock/${id}`);
	const stockAmount = stock.data.amount;

	if (amount > stockAmount) {
		// Fora de estoque
		return;
	}

	yield put(updateAmountSuccess(id, amount));
}

export default all([
	takeLatest('@cart/ADD_REQUEST', addToCart),
	takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);

// TakeLatest usa a última chamada
// TakeEvery chama todas as vezes
