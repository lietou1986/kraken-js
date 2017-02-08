'use strict';
var UserInfo = require('../models/userinfo');

var Default_Cookie_Encrypt_Keys =
    [
        'sdfdsgweg',
        'asdfssgjweh',
        'asdfssgjweh',
        'asdsdfsdfssgjweh',
        'sadf',
        'asdfiulssgjweh',
        'dfmasrtdfsdfssgjweh',
        'gm765',
        'm,yuliuy4',
        'a,56i6k',
        '457hjk'
    ];


function encrypt(data, key) {
    var result = new Buffer(data.length);
    if (!tools.isNullOrEmpty(key.trim())) {
        var arrKeys = new Buffer(key);
        var bt;
        var k = 0;

        for (var i = 0; i < data.length; i++) {
            bt = data[i] ^ arrKeys[k];
            result[i] = (bt);
            k++;
            if (k >= key.length) {
                k = 0;
            }
        }
    }
    return result;
}

function decryptData(cookie) {
    var result = '';
    if (tools.isNullOrEmpty(cookie))
        return result;

    var randNum = tools.convert(cookie.substr(cookie.length - 1), 0);
    if (randNum == 0) return result;

    var data = new Buffer((cookie.length - 1) / 2);
    var k = 0;
    for (var i = 0; i < cookie.length - 1; i = i + 2) {
        data[k++] = new Buffer(cookie.substr(i, 2), 'hex')[0];
    }

    var bytes = encrypt(data, Default_Cookie_Encrypt_Keys[randNum]);
    result = new Buffer(bytes).toString('utf16le');

    return result;
}


function md5(input) {
    return exports.utils.base64encode(exports.utils.md5(input));
}



function getUserInfoByCookie(cookie) {
    var cookieValue = decryptData(cookie);
    if (tools.isNullOrEmpty(cookieValue))
        return null;
    return getUserInfoCookie(cookieValue);
}


function getUserInfoCookie(userInfoValue) {
    if (tools.isNullOrEmpty(userInfoValue))
        return null;

    var user = new UserInfo();
    var arrUserInfo = userInfoValue.split(';');

    for (var v in arrUserInfo) {
        var item = arrUserInfo[v];
        if (tools.isNullOrEmpty(item))
            continue;

        var arrItem = item.split('=');
        if (arrItem.length == 2) {
            switch (arrItem[0].toUpperCase()) {
                case 'UD':
                    user.UserID = arrItem[1].toString();
                    break;

                case 'LN':
                    user.LoginName = decodeURIComponent(arrItem[1]);
                    break;

                case 'UN':
                    user.UserName = decodeURIComponent(arrItem[1]);
                    break;

                case 'NN':
                    user.NickName = decodeURIComponent(arrItem[1]);
                    break;

                case 'BD':
                    user.LoginBUID = arrItem[1].toString();
                    break;

                case 'BN':
                    user.LoginBUName = decodeURIComponent(arrItem[1]);
                    break;

                case 'TM':
                    user.TokenMask = decodeURIComponent(arrItem[1]);
                    break;

                case 'EM':
                    user.Email = decodeURIComponent(arrItem[1]);
                    break;

                case 'ST':
                    user.Status = arrItem[1].toString();
                    break;

                case 'AT':
                    user.ActionTime = decodeURIComponent(arrItem[1]);
                    break;

                case 'DD':
                    user.DepartmentID = arrItem[1].toString();
                    break;

                case 'DN':
                    user.DepartmentName = decodeURIComponent(arrItem[1]);
                    break;

                case 'LM':
                    user.LevelMark = decodeURIComponent(arrItem[1]);
                    break;

                case 'CD':
                    user.CityID = arrItem[1].toString();
                    break;

                case 'AL':
                    user.IsAutoLogin = (arrItem[1] == '0') ? false : true;
                    break;

                case 'UA':
                    user.UAccountNo = decodeURIComponent(arrItem[1]);
                    break;

                case 'CA':
                    user.CAccountNo = decodeURIComponent(arrItem[1]);
                    break;

                case 'DA':
                    user.DAccountNo = decodeURIComponent(arrItem[1]);
                    break;

                case 'UT':
                    user.UserType = arrItem[1].toString();
                    break;

                case 'SI':
                    user.UserSourceID = arrItem[1].toString();
                    break;

                case 'DC':
                    user.DepLoginCount = arrItem[1].toString();
                    break;

                case 'IP':
                    user.ServerIP = arrItem[1].toString();
                    break;
            }
        }
    }
    return user;
}

/**
 * 获取用户信息
 * 316629614E724264577353664173536A4E6559645F6D5973497428663D645B731F670377006810660261067245645F735C664573276A06651964486D02731D740966486433733D675777EE1BB401123F3926380F5D7321663E735A6A1B650164036D15731D74116642645F734B675C77256815661C615D721764097309664873346A23655564576D5A73337430664E6451735E675877536844665C6142724E64537354664873266A3B655564576D5A73277425664E642C733E675B775268566659614A7245645F735C6647735C6A22653C645B6D5073497437663A645B73436751776
 */
exports.getUserInfo = function (cookier) {
    var strUserInfos = cookier.get('JSsUserInfo');

    if (tools.isNullOrEmpty(strUserInfos) || strUserInfos === 'null') {
        strUserInfos = cookier.get('JSpUserInfo');
    }
    // strUserInfos = '316629614E724264577353664173536A4E6559645F6D5973497428663D645B731F670377006810660261067245645F735C664573276A06651964486D02731D740966486433733D675777EE1BB401123F3926380F5D7321663E735A6A1B650164036D15731D74116642645F734B675C77256815661C615D721764097309664873346A23655564576D5A73337430664E6451735E675877536844665C6142724E64537354664873266A3B655564576D5A73277425664E642C733E675B775268566659614A7245645F735C6647735C6A22653C645B6D5073497437663A645B73436751776';

    strUserInfos = strUserInfos === 'null' ? '' : strUserInfos;

    if (tools.isNullOrEmpty(strUserInfos)) return null;

    var uc = getUserInfoByCookie(strUserInfos);

    if (uc != null) {
        var email = cookier.get('iemail');
        if (!tools.isNullOrEmpty(email)) {
            uc.Email = email;
        }
        var rinfo = cookier.get('rinfo');
        //rinfo = 'JM172491984R90250004000_1';
        if (!tools.isNullOrEmpty(rinfo)) {
            var rinfos = rinfo.split('_');
            uc.ResumeNumber = rinfos[0];
            uc.ResumeVersion = rinfos.length > 1 ? rinfos[1] : '1';
        }
    }
    return uc;
}

