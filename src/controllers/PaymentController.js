import PaymentService from "../services/PaymentServices.js";

class PaymentController {
  async createPaymentUrl(req, res, next) {
    try {
      const { amount, accountId, type } = req.params;
      const vnpUrlPromise = PaymentService.createVnPayUrl(
        amount,
        accountId,
        type,
        req
      );
      const vnpUrl = await vnpUrlPromise;
      res.status(200).json(vnpUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  async createPaymentUrlUpgrade(req, res, next) {
    try {
      const { amount, accountId, type } = req.params;
      const vnpUrlPromise = PaymentService.createVnPayUrlUpgrade(
        amount,
        accountId,
        type,
        req
      );
      const vnpUrl = await vnpUrlPromise;
      res.status(200).json(vnpUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  async vnPayReturn(req, res, next) {
    try {
      const { query, params } = req;
      const { accountId, amount, type } = params;

      const savedPayment = await PaymentService.vnPayReturn(
        query,
        accountId,
        amount,
        type
      );
      res.redirect("http://localhost:3000");
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  async vnPayReturnUpgrade(req, res, next) {
    try {
      const { query, params } = req;
      const { accountId, amount, type } = params;

      const savedPayment = await PaymentService.vnPayReturnUpgrade(
        query,
        accountId,
        amount,
        type
      );
      res.redirect("http://localhost:3000");
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new PaymentController();
