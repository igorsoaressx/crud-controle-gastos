const { Router } = require('express');
const { getMetas, addMeta, updateMeta, deleteMeta, getMetaPorId } = require('../controllers/metaController');

const rotasMetas = new Router();

rotasMetas.route('/meta')
   .get(getMetas)
   .post(addMeta)
   .put(updateMeta);

rotasMetas.route('/meta/:id')
   .get(getMetaPorId)
   .delete(deleteMeta);

module.exports = { rotasMetas };