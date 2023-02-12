// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TaskBidding {
    // Define a struct to store information about a project
    struct Project {
        uint256 projectId;
        address manager;
        string projectName;
        uint256 deadline;
        uint256[] taskIds;
    }

    // Define a struct to store information about a task
    struct Task {
        uint256 taskId;
        uint256 projectId;
        uint256 amount;
        uint256 deadline;
        address developer;
        uint256 status; // 0 = open, 1 = in progress, 2 = completed
    }

    // Define a struct to store information about a bid
    struct Bid {
        uint256 taskId;
        address developer;
        uint256 amount;
        string description;
    }

    // Create a mapping to store projects
    mapping(uint256 => Project) public projects;
    uint256 projectCount;

    // Create a mapping to store tasks
    mapping(uint256 => Task) public tasks;
    uint256 taskCount;

    // Create a mapping to store bids
    mapping(uint256 => Bid[]) public bids;
    uint256 bidCount;

    // Event to track changes to projects
    event ProjectCreated(
        uint256 projectId,
        address manager,
        string projectName,
        uint256 deadline
    );

    // Event to track changes to tasks
    event TaskCreated(
        uint256 taskId,
        uint256 projectId,
        uint256 amount,
        uint256 deadline
    );
    event TaskUpdated(uint256 taskId, uint256 status, address developer);

    // Event to track changes to bids
    event BidCreated(
        uint256 taskId,
        address developer,
        uint256 amount,
        string description
    );

    // Function to create a new project
    function createProject(string memory projectName, uint256 deadline) public {
        uint256 projectId = projectCount++;
        projects[projectId] = Project(
            projectId,
            msg.sender,
            projectName,
            deadline,
            new uint256[](0)
        );
        emit ProjectCreated(projectId, msg.sender, projectName, deadline);
    }

    // Function to add a task to a project
    function addTask(
        uint256 projectId,
        uint256 amount,
        uint256 deadline
    ) public {
        require(
            msg.sender == projects[projectId].manager,
            "Only the project manager can add tasks"
        );

        uint256 taskId = taskCount++;
        tasks[taskId] = Task(
            taskId,
            projectId,
            amount,
            deadline,
            address(0),
            0
        );
        projects[projectId].taskIds.push(taskId);
        emit TaskCreated(taskId, projectId, amount, deadline);
    }

    // Function for developers to propose for a task
    function propose(
        uint256 taskId,
        uint256 amount,
        string memory description
    ) public {
        require(
            tasks[taskId].status == 0,
            "Task is already in progress or completed"
        );

        uint256 bidId = bidCount++;
        bids[taskId][bidId] = Bid(taskId, msg.sender, amount, description);
        emit BidCreated(taskId, msg.sender, amount, description);
    }

    // Function for project managers to select a developer for a task
    function selectDeveloper(uint256 taskId, address developer) public {
        require(
            msg.sender == projects[tasks[taskId].projectId].manager,
            "Only the project manager can select a developer"
        );
        require(
            tasks[taskId].status == 0,
            "Task is already in progress or completed"
        );

        tasks[taskId].developer = developer;
        tasks[taskId].status = 1;
        emit TaskUpdated(taskId, 1, developer);
    }

    // Function for developers to complete a task
    function completeTask(uint256 taskId) public {
        require(
            msg.sender == tasks[taskId].developer,
            "Only the assigned developer can complete the task"
        );
        require(tasks[taskId].status == 1, "Task is not in progress");

        tasks[taskId].status = 2;
        emit TaskUpdated(taskId, 2, msg.sender);
    }

    // Function to retrieve all projects
    function getProjects() public view returns (Project[] memory) {
        Project[] memory result = new Project[](projectCount);
        for (uint256 i = 0; i < projectCount; i++) {
            result[i] = projects[i];
        }
        return result;
    }

    // Function to retrieve all tasks for a project
    function getTasks(uint256 projectId) public view returns (Task[] memory) {
        Task[] memory result = new Task[](projects[projectId].taskIds.length);
        for (uint256 i = 0; i < projects[projectId].taskIds.length; i++) {
            result[i] = tasks[projects[projectId].taskIds[i]];
        }
        return result;
    }
}
