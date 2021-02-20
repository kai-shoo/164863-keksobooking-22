/* global L:readonly */
import { getMocks } from './get-mocks.js';

const parentEl = document.querySelector('#map-canvas');
export const map = L.map(parentEl);

export const state = getMocks();
