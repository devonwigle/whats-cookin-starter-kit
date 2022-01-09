import { expect } from 'chai';
import userData from './test-data/users-data.js';
import ingredientsData from './test-data/ingredients-data';
import recipeData from './test-data/recipes-data';
import User from '../src/classes/User';
import Pantry from '../src/classes/Pantry'

describe('User', () => {
    let Pantry;
    beforeEach(() => {
        Pantry = new Pantry(userData.pantry);
    });

    it('Should be a function', () => {
        expect(Pantry).to.be.a('function');
    });