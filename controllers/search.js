
const { response, request } = require('express');
const axios = require('axios');

const idGeneros = require('../helpers/idgeneros');
const consultasApi = require('../helpers/consultaapi');
const getDataFile = require('../helpers/getdatafile');



const searchPost = async (req = request, res = response) => {

	const { words, sort, orderBy, genero, tipo, limite } = req.body;

	if (words.length > 0 && words.length < 3) {
		console.log(words.length)
		res.status(404).json({
			msg: 'La busqueda debe contener al menos 3 caracteres'
		})
	}


	// transformo parametros
	const searchWords = words ? `${words.replace(' ', '%20')}&` : '';
	const sortParameter = sort ? `sort=${sort}&` : '';
	const orderByParameter = orderBy ? `order_by=${orderBy}&` : '';
	let idGenre = idGeneros[genero];
	const generoParameter = genero ? `genre=${idGenre}&` : '';
	const limiteParameter = limite ? `limit=${limite}&` : '';
	const tipoParameter = tipo ? `type=${tipo}&` : '';




	const urlExternApi = 'https://api.jikan.moe/v3/search/anime?q=';
	const urlSearchAll = 'https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc'


	let completeSearchUrl = `${urlExternApi}${searchWords}&${sortParameter}&${orderByParameter}` +
		`${generoParameter}&${limiteParameter}&${tipoParameter}`;

	if (searchWords === '') { completeSearchUrl = urlSearchAll }

	await consultasApi(completeSearchUrl);
	const info = await getDataFile()

	// console.log(info.results[0]);

	if (info.message) {
		res.status(404).json({
			msg: "Su busqueda no arroja resultados"
		})
	}
	info.results.forEach((element) => {
		let message = '';
		if (element.score >= 1 && element.score <= 4.9) {
			message = "I do not recommend it."
		} else if (element.score > 5 && element.score <= 7.9) {
			message = "You may have fun."
		} else {
			message = "Great, this is one of the best anime."
		}

		element.message = message
	})



	res.json({
		'msg': 'ok',
		'values': info.results
	})
}

module.exports = {
	searchPost
} 