const ORDER_MONEY = 100000;
const ACCEPTABLE_DIFFERENCE = 10000;
const MEMO_PREFIX = 'DH';
const HEADER_SECURE_TOKEN = 'eogrBiWqaq';
function parseOrderId(description) {
    const re = new RegExp(`${MEMO_PREFIX}\\d+`, 'mi');
    const matches = description.match(re);
  
    if (!matches || matches.length === 0) {
      return null;
    }
  
    const orderCode = matches[0];
    const prefixLength = MEMO_PREFIX.length;
  
    return parseInt(orderCode.substr(prefixLength));
  }
function handleTransactions(transactions, res) {
    console.log(transactions);
    for (const transaction of transactions) {
      const description = transaction.description;
      const amount = transaction.amount
      console.log(description, amount);
      const orderId = parseOrderId(description);
  
      if (orderId === null) {
        res.write(`Không nhận dạng được order_id từ nội dung chuyển tiền : ${description}\n`);
        continue;
      }
  
      res.write(`Nhận dạng order_id là ${orderId}\n`);
  
      const paid = transaction.amount;
      const total = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(paid);
      const orderNote = `Casso thông báo nhận ${total}, nội dung ${description} chuyển vào STK ${transaction.bank_sub_acc_id}`;
      const acceptableDifference = Math.abs(ACCEPTABLE_DIFFERENCE);
  
      
    }
  
    res.write('Xử lý hoàn tất\n');
    res.end();
  }

module.exports = {
    webhookConfig: (req, res) => {
  const jsonBody = req.body;

  if (!jsonBody) {
    res.status(400).send('Request thiếu body');
  } else if (jsonBody.error !== 0) {
    res.status(400).send('Có lỗi xay ra ở phía Casso');
  } else {
    const headers = req.headers;

    if (headers['secure-token'] !== HEADER_SECURE_TOKEN) {
      res.status(400).send('Thiếu Secure Token hoặc secure token không khớp');
    } else {
      handleTransactions(jsonBody.data, res);
    }
  }
}
}






