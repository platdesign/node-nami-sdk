'use strict';

const ApiWrapper = require('@platdesign/nami-api-client');


module.exports = class NamiSDK {

	/**
	 * Class constructor
	 * @param {String} config.groupId 		Stammesnummer
	 * @param {String} config.userId 			Mitgliedsnummer eines Users mit API-Berechtigung
	 * @param {String} config.password 		Passwort des Users
	 * @param {Boolean} config.production if true nami.dpsg.de will be requested instead of namitest.dpsg.de
	 */
	constructor(config) {

		this._config = config;

		this._api = new ApiWrapper({
				userId: config.userId,
				password: config.password,
				production: config.production
		});

		this.callService = this._api.callService.bind(this._api);

	}


	/**
	 * Request group stats
	 * @return {Promise}
	 */
	async getGroupStats() {
		return this.callService('GET', `/dashboard/stats/stats`);
	}




	/**
	 * Request members with details
	 * @param  {Object} query {limit, start, page}
	 * @return {Promise}      resolves with data from _request result
	 */
	async getMembers(groupId, query = {}) {
		return this.callService('GET', `/nami/mitglied/filtered-for-navigation/gruppierung/gruppierung/${groupId || this._config.groupId}/flist`, { query });
	}



	/**
	 * Get a list of all members (id, name)
	 * @param  {String} groupId optional groupId (otherwise global groupId is used)
	 * @param  {Object} query   { limit, start, page }
	 * @return {Promise}
	 */
	async getMembersShort(groupId, query = {}) {
		return this.callService('GET', `/nami/mitglied/filtered-for-navigation/gruppierung/gruppierung/${groupId || this._config.groupId}`, { query });
	}



	/**
	 * Request member roles
	 * @param  {Number} memberId
	 * @return {Promise}          resolves with data from _request result
	 */
	async getMemberRoles(memberId, query = {}) {
		return this.callService('GET', `/nami/zugeordnete-taetigkeiten/filtered-for-navigation/gruppierung-mitglied/mitglied/${memberId}/flist`, { query });
	}


	/**
	 * Request member roles (ids only)
	 * @param  {Number} memberId
	 * @return {Promise}          resolves with data from _request result
	 */
	async getMemberRolesShort(memberId, query = {}) {
		return this.callService('GET', `/nami/zugeordnete-taetigkeiten/filtered-for-navigation/gruppierung-mitglied/mitglied/${memberId}`, { query });
	}


	/**
	 * Request member role details
	 * @param  {Number} memberId
	 * @return {Promise}          resolves with data from _request result
	 */
	async getMemberRoleDetails(memberId, roleId, query = {}) {
		return this.callService('GET', `/nami/zugeordnete-taetigkeiten/filtered-for-navigation/gruppierung-mitglied/mitglied/${memberId}/${roleId}`, { query });
	}



	/**
	 * Request member details
	 * @param  {Number} memberId
	 * @return {Promise}          resolves with data from _request result
	 */
	async getMemberDetails(memberId) {
		return this.callService('GET', `/nami/mitglied/filtered-for-navigation/gruppierung/gruppierung/${this._config.groupId}/${memberId}`);
	}

};
