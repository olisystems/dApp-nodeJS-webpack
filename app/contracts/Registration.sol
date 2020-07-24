pragma solidity >=0.4.22 <0.7.0;

/// @title Registration
/// @author Muhammad Yahya
/// @notice Implements a user registration system
/// @dev rigister users and send random values
contract Registration {
    /// @notice the address of contract owner
    address public owner;

    /// @notice create contract owner
    /// @dev assign caller to contract owner
    constructor() public {
        owner = msg.sender;
    }

    /// @notice user registration details
    struct User {
        string name;
        uint8 age;
        bool registered;
    }

    /// @notice events fired for user registration and send values
    event NewUser(address userAddress, string name, uint8 age);
    event NewValue(address userAddress, uint256 value);

    /// @notice map address to user info
    mapping(address => User) public users;

    /// @dev modifier to allow only owner to register new user
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can register a user.");
        _;
    }

    /// @notice allows to register user
    /// @dev only owner can register user
    /// @param _address Ethereum address of user
    /// @param _name name of user
    /// @param _age age of user
    function registerUser(
        address _address,
        string memory _name,
        uint8 _age
    ) public onlyOwner {
        users[_address] = User(_name, _age, true);
        emit NewUser(_address, _name, _age);
    }

    /// @notice send random values
    /// @dev only registered users can send values
    /// @param _value random value to send
    function send(uint256 _value) public {
        require(
            users[msg.sender].registered == true,
            "Caller is not registered."
        );
        emit NewValue(msg.sender, _value);
    }
}
