var SearchType = require('../models/searchtype');

module.exports = function SearchInfo() {
    return {
        Query: {},
        JobType: '',
        JobTypeCN: '',
        SubJobType: '',
        SubJobTypeCN: '',
        Industry: '',
        IndustryCN: '',
        PublishDate: '',
        PublishDateCN: '',
        JobLocation: 0,
        JobLocationCN: '',
        WorkingExp: '',
        WorkingExpCN: '',
        EduLevel: '',
        EduLevelCN: '',
        CompanyType: '',
        CompanySize: '',
        EmplType: '',
        EmplTypeCN: '',
        CompanyTypeCN: '',
        CompanySizeCN: '',
        SalaryFrom: '',
        SalaryTo: '',
        KeyWordType: 1,
        KeyWords: '',
        SafeKeyWords: '',
        CompanyID: '',
        SortBy: 0,
        ShowModel: 0,
        GeoAddress: '',
        GeoCenterCate: '',
        GeoRadius: 2,
        Region: '',
        RegionCN: '',
        SearchGuid: '',
        FilterJobTag: '',
        FilterLocation: '',
        FilterLocationCN: '',
        IsFilter: false,
        IsJobTagSwitch: false,
        Jyywl: '',
        IsDebug: false,
        UserInfo: null,
        IsHasSearchResult: false,
        IsUseSearchComplement: false,
        IsUseResumeMatch: false,
        Page: 1,
        PageSize: 60,
        IsCompanyJobSearch: false,
        SearchUrl: '',
        IsAdv: false,
        GeoLatitude: 0,
        GeoLongitude: 0,
        ExcludedCompanyIds: [],
        debugInfo: [],
        SearchType: SearchType.search
    };
};
