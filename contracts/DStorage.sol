// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DStorage{
  
    mapping(address => string[]) public uploadedData;
    mapping(address=>mapping(address=>bool)) access;
    mapping(address => mapping(address=>string[])) shared;
    mapping(address=>address[]) public hasSharedImages;

    
    function shareImage(address _from,address _to,string calldata _url) external {
        if(access[_from][_to] == false){
            access[_from][_to] = true;
            hasSharedImages[_to].push(_from);
        }
            shared[_from][_to].push(_url);
    }

    function getSharedImages(address _user,address _from, uint index) external view returns(string memory){
        require(access[_user][_from],"You no more have access to this account");
        return  shared[_user][_from][index];
    }

    function removeAccess(address _user, address _from) external{
        access[_user][_from] = false;
    }
    
    function uploadData(address _address, string calldata _url) external{
       uploadedData[_address].push(_url);
    }

    function getSharedAccountsLength(address _account) public view returns (uint) {
        return hasSharedImages[_account].length;
    }

    function getDataLength(address _account) public view returns (uint) {
        return uploadedData[_account].length;
    }

    function getSharedDataLength(address _to, address _from) public view returns (uint) {
        return shared[_to][_from].length;
    }

}