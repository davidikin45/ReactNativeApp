import { pathOr } from 'ramda';

export function isRequestRunning(state, request) {
	return pathOr(false, [
		'requests',
		`'${request}'`,
		'running'
	], state);
}

export function getRequestError(state, request) {
	return pathOr('', [
		'requests',
		`'${request}'`,
		'error'
	], state);
}
