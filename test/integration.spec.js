'use strict';

const fs = require('fs');
const path = require('path');
const { expect } = require('code');
const NaMi = require('..');


const CONFIG_PATH = path.resolve(__dirname, 'config.json')

if(!fs.existsSync(CONFIG_PATH)) {
	throw new Error('Please create config.json from config.template.json');
}

let nami = new NaMi(require(CONFIG_PATH));




describe('Requests', function() {
	this.timeout(0);


	describe('getGroupStats()', () => {

		it('should return expected schema', async () => {

			let res = await nami.getGroupStats();

			expect(res.success)
				.to.be.true();

			expect(res.data)
				.to.be.an.object();

			expect(res.data.nrMitglieder)
				.to.be.a.number();

			expect(res.data.statsCategories)
				.to.be.an.array();


			if(res.data.statsCategories.length) {
				expect(res.data.statsCategories[0].name)
					.to.be.a.string();

				expect(res.data.statsCategories[0].count)
					.to.be.a.number();
			}

		});


	});




	describe('getMembers()', () => {

		it('should return expected schema', async () => {

			let res = await nami.getMembers();

			expect(res.success)
				.to.be.true();

			expect(res.data)
				.to.be.an.array();

		});

	});



	describe('getMembersShort()', () => {

		it('should return expected schema', async () => {

			let res = await nami.getMembersShort();

			expect(res.success)
				.to.be.true();

			expect(res.data)
				.to.be.an.array();

		});

	});





	describe('getMemberRoles()', () => {

		it('should return expected schema', async () => {

			let { data } = await nami.getMembersShort();

			let res = await nami.getMemberRoles(data[0].id);

			expect(res.success)
				.to.be.true();

			expect(res.data)
				.to.be.an.array();

		});

	});



	describe('getMemberRolesShort()', () => {

		it('should return expected schema', async () => {

			let res1 = await nami.getMembersShort();

			let res2 = await nami.getMemberRolesShort(res1.data[0].id);

			let res3 = await nami.getMemberRoleDetails(res1.data[0].id, res2.data[0].id);

			expect(res3.success)
				.to.be.true();

			expect(res3.data)
				.to.be.an.object();

		});

	});






	describe('getMemberDetails()', () => {

		it('should return expected schema', async () => {

			let { data } = await nami.getMembersShort();

			let res = await nami.getMemberDetails(data[0].id);

			expect(res.success)
				.to.be.true();

			expect(res.data)
				.to.be.an.object();

		});

	});


});
