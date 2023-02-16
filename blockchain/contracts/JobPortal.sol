// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract JobPortal{
    struct Project {
        string projectURI;
        uint projectId;
        address projectManager;
        mapping(uint => Task) tasks; //Task[] tasks;
        uint taskCount;
    }

     struct Task {
        string taskURI;
        uint taskId;
        uint stakedAmount;
        mapping(uint => Proposal) proposals; //Proposal[] proposals;
        address selectedWorker;
        uint proposalCount;
        bool completed;
        bool reviewed;
    }

    struct Proposal {
        string proposalURI;
        address freelancer;
        uint bidAmount;
        string motivation;
    }

    mapping(uint => Project) public projects; //Project[] public projects;
    uint public projectCount;
    
    event NewProject(uint projectId, address projectManager, string projectURI);
    event NewTask(uint projectId, uint taskId, uint stakedAmount, string taskURI);
    event NewProposal(uint projectId, uint taskId, address freelancer, uint bidAmount, string proposalURI);
    event WorkerSelected(uint projectId, uint taskId, address worker);
    event TaskCompleted(uint projectId, uint taskId);
    event ReviewCompleted(uint projectId, uint taskId);
    event PaymentReleased(uint projectId, uint taskId, address worker, uint amount);
    
    receive() external payable {}

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function createProject(string calldata projectURI) public {
        projects[projectCount].projectURI = projectURI;
        projects[projectCount].projectId = projectCount;
        projects[projectCount].projectManager = msg.sender;
        projects[projectCount].taskCount = 0;

        projectCount++;

        emit NewProject(projectCount-1, msg.sender, projectURI);
    }

    function getCurrentProjectId() public view returns (uint) {
        return projectCount - 1;
    }

    // get the tasks of a project
    function getTaskCountByProjectId(uint projectId) public view returns (uint) {
        return projects[projectId].taskCount;
    }

    function getTaskData(uint projectId, uint taskId) public view returns (
        string memory taskURI,
        uint Id,
        uint stakedAmount,
        uint proposalCount,
        address worker,
        bool isComplete,
        bool isReviewed
    ) {
        Task storage task = projects[projectId].tasks[taskId];
        return (task.taskURI, task.taskId, task.stakedAmount, task.proposalCount, task.selectedWorker, task.completed, task.reviewed);
    }


    function createTask(uint projectId, uint stakedAmount, string calldata taskURI) public payable {
        require(msg.sender == projects[projectId].projectManager, "Only project manager can create tasks");

        projects[projectId].tasks[projects[projectId].taskCount].taskURI = taskURI;
        projects[projectId].tasks[projects[projectId].taskCount].taskId = projects[projectId].taskCount;
        projects[projectId].tasks[projects[projectId].taskCount].stakedAmount = stakedAmount;
        projects[projectId].tasks[projects[projectId].taskCount].completed = false;
        projects[projectId].tasks[projects[projectId].taskCount].reviewed = false;
        projects[projectId].taskCount++;

        (bool sent, bytes memory data) = (address(this)).call{value: msg.value}("");

        require(sent, "Not sent");

        emit NewTask(projectId, projects[projectId].taskCount-1, stakedAmount, taskURI);
    }

    function sendProposal(uint projectId, uint taskId, uint bidAmount, string memory motivation, string calldata proposalURI) public {
        uint proposalCount = projects[projectId].tasks[taskId].proposalCount;
        address selectedWorker = projects[projectId].tasks[taskId].selectedWorker;

        require(selectedWorker == address(0), "Freelancer has already been selected for this task");
        
        projects[projectId].tasks[taskId].proposals[proposalCount].proposalURI = proposalURI;
        projects[projectId].tasks[taskId].proposals[proposalCount].freelancer = msg.sender;
        projects[projectId].tasks[taskId].proposals[proposalCount].bidAmount = bidAmount;
        projects[projectId].tasks[taskId].proposals[proposalCount].motivation = motivation;
        projects[projectId].tasks[taskId].proposalCount++;

        emit NewProposal(projectId, taskId, msg.sender, bidAmount, proposalURI);
    }

    function getProposalsByTaskId(uint projectId, uint taskId) public view returns (Proposal[] memory) {
        Proposal[] memory proposals = new Proposal[](projects[projectId].tasks[taskId].proposalCount);
        for (uint i = 0; i < projects[projectId].tasks[taskId].proposalCount; i++) {
            proposals[i] = projects[projectId].tasks[taskId].proposals[i];
        }
        return proposals;
    }

    function selectWorker(uint projectId, uint taskId, address worker) public {
        require(!projects[projectId].tasks[taskId].completed, "Task is already completed");

        projects[projectId].tasks[taskId].selectedWorker = worker;
        emit WorkerSelected(projectId, taskId, worker);    
    }

    function completeTaskWorker(uint projectId, uint taskId) public {
        require(msg.sender == projects[projectId].tasks[taskId].selectedWorker, "Only selected worker can complete the task");

        projects[projectId].tasks[taskId].completed = true;

        emit TaskCompleted(projectId, taskId);
    }

    function reviewTask(uint projectId, uint taskId) public {
        require(msg.sender == projects[projectId].projectManager, "Only project manager can review Task");
        require(projects[projectId].tasks[taskId].completed, "Task is not completed yet");

        projects[projectId].tasks[taskId].reviewed = true;

        emit ReviewCompleted(projectId, taskId);
    }


    function releasePayment(uint projectId, uint taskId) payable public {
        require(msg.sender == projects[projectId].projectManager, "Only project manager can release payment");
        require(projects[projectId].tasks[taskId].reviewed, "Task is not reviewed yet");

        uint stakedAmount = projects[projectId].tasks[taskId].stakedAmount;
        address worker = projects[projectId].tasks[taskId].selectedWorker;

        payable(worker).transfer(stakedAmount);

        emit PaymentReleased(projectId, taskId, worker, stakedAmount);
    
    }

}