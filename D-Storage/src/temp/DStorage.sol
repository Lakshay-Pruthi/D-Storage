// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DStorage{
    struct FileAccess{
        string URL;
        bool access;
    }

    mapping(address => string[]) uploadedData;
    mapping(string => mapping(address=>bool)) shared;
    mapping(address => FileAccess[]) public allSharedFiles;
    

    function uploadData(string calldata _url) external{
       uploadedData[msg.sender].push(_url);
    }

    function shareFile(string calldata _fileURL, address _to) external{
        shared[_fileURL][_to] = true;
        FileAccess memory file = FileAccess(_fileURL,true);
        allSharedFiles[_to].push(file);
    }

    function removeAccess(string calldata _file,address _from) external{
        shared[_file][_from] = false;
        for(uint i = 0;i<allSharedFiles[_from].length;i++){
        FileAccess memory file = allSharedFiles[_from][i];
        if(file.URL == _file){
            allSharedFiles[_from][i].access = false;
            break;
        }
            
        }
        file.access = false;
    }
}