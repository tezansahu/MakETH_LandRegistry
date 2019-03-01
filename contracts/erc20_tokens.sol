pragma solidity^"0.5.0";

import "./land_registration.sol";

contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address _landOwner) public view returns (uint balance);
    function allowance(address _landOwner, address _spender) public view returns (uint remaining);
    function transfer(address _to, uint _landId) public returns (bool success);
    function approve(address _spender, uint _landId) public returns (bool success);
    function transferFrom(address _from, address _to, uint _landId) public returns (bool success);

    event Transfer(address indexed _from, address indexed _to, bytes _landAddress);
    event Approval(address indexed _landOwner, address indexed _spender, bytes _landAddress);
}