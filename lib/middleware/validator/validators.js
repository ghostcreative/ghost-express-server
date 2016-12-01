module.exports = {
  isAddress: function (obj) {
    if ( !obj || !(obj.line1) || !(obj.city) || !(obj.state) || !(obj.zip) ) return false;
    return true;
  },
  isArray: function (obj, min) {
    min = min || 0;
    return Array.isArray(obj) && obj.length >= min;
  },
  isDoc: function (obj) {
    return obj && obj.id && obj.createdAt && obj.updatedAt;
  },
  isSortDirection: function (str) {
    return str.toLowerCase() == 'asc' || str.toLowerCase() == 'desc';
  },
  isCreditCard: function (obj) {
    return obj.number && obj.exp_month && obj.exp_year && obj.cvc;
  },
  isEqual: function (obj, test) {
    return obj == test;
  },
  isImageFile: function (obj) {
    if (!obj || !obj.id ) return false;
    if (!obj.type || obj.type.substring(0,5) != 'image') return false;
    if (!obj.fileType || (obj.fileType != 'jpeg' && obj.fileType != 'png' && obj.fileType != 'gif' && obj.fileType != 'jpg') ) return false;
    if (!obj.body) return false;
    return true;
  },
  isState: function (state) {
    const states = [];
    return
  },
  isUserRole: function (str) {
    return str == 'user' || str == 'admin'
  }
};