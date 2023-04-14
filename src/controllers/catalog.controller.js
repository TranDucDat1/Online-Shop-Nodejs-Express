const { CatalogService } = require('../service');

exports.createCatalog = async (req, res) => {
    const data = req.body;
    try {
        await CatalogService.createCatalog(data);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
}
