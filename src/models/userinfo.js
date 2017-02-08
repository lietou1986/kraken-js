/**
 * 用户信息实体类
 */
module.exports = function UserInfo() {
    return {
        /**
        * 用户COOKIE中的 UD
        * 用户编号
        */
        UserID: '',

        /**
        * 用户COOKIE中的 LN
        * 用户登录名称
        */
        LoginName: '',

        /**
        * 用户COOKIE中的 UN
        * 用户姓名
        */
        UserName: '',

        /**
        * 用户COOKIE中的 NN
        * 用户昵称
        */
        NickName: '',

        /**
        * 用户COOIE中的 BD
        * 登录公司ID
        */
        LoginBUID: '',

        /**
        * 用户COOIE中的 BN
        * 登录公司名称
        */
        LoginBUName: '',

        /**
        * 用户COOIE中的 TM
        * 用户权限串
        */
        TokenMask: '',

        /**
        * 用户COOIE中的 EM
        * 用户Email地址
        */
        Email: '',

        /**
        * 用户COOIE中的 ST
        * 用户状态
        */
        Status: '',

        /**
        * 用户COOIE中的 AT
        *
        */
        ActionTime: '',

        /**
        * 用户COOIE中的 DD
        * 登录点ID
        */
        DepartmentID: '',

        /**
        * 用户COOIE中的 DN
        * 登录点名称
        */
        DepartmentName: '',

        /**
        * 用户COOIE中的 LM
        * 登录点LevelMark
        */
        LevelMark: '',

        /**
        * 用户COOIE中的 CD
        * 登录点所在城市
        */
        CityID: '',

        /**
        * 用户COOIE中的 AL
        * 是否通过Email或者Cookie自动登录
        */
        IsAutoLogin: false,

        /**
        * 用户COOIE中的 UA
        * 用户Account No
        */
        UAccountNo: '',

        /**
        * 用户COOIE中的 CA
        * 公司Account No
        */
        CAccountNo: '',

        /**
        * 用户COOIE中的 DA
        * 登录点Account No
        */
        DAccountNo: '',

        /**
        * 用户COOIE中的 UT
        * 用户类别
        */
        UserType: '',

        /**
        * 用户COOIE中的 DC
        */
        DepLoginCount: '',

        /**
        * 用户COOIE中的 SI
        */
        UserSourceID: '',

        /**
        * 用户COOIK中的 IP
        */
        ServerIP: '',

        /**
        * 手机号对应数据库字段中的company_id
        */
        Mobile: '',

        /**
        * 是否通过手机号注册的标识（1为true）
        */
        MobileFalg: false,

        /**
        * 简历编号
        */
        ResumeNumber: '',

        /**
        * 版本号
        */
        ResumeVersion: '',
    };
};
