// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract JobPortal {
    struct Project {
        uint256 projectId;
        address projectManager;
        mapping(uint256 => Task) tasks; //Task[] tasks;
        uint256 taskCount;
    }

    struct Task {
        uint256 taskId;
        uint256 stakedAmount;
        mapping(uint256 => Proposal) proposals; //Proposal[] proposals;
        address selectedWorker;
        uint256 proposalCount;
        bool completed;
    }

    struct Proposal {
        address freelancer;
        uint256 bidAmount;
        string motivation;
    }

    mapping(uint256 => Project) projects; //Project[] public projects;
    uint256 projectCount;

    event NewProject(uint256 projectId, address projectManager);
    event NewTask(uint256 projectId, uint256 taskId, uint256 stakedAmount);
    event NewProposal(
        uint256 projectId,
        uint256 taskId,
        address freelancer,
        uint256 bidAmount
    );
    event WorkerSelected(uint256 projectId, uint256 taskId, address worker);
    event TaskCompleted(uint256 projectId, uint256 taskId);
    event PaymentReleased(
        uint256 projectId,
        uint256 taskId,
        address worker,
        uint256 amount
    );

    function createProject(address projectManager) public {
        projects[projectCount].projectId = projectCount;
        projects[projectCount].projectManager = projectManager;
        projects[projectCount].taskCount = 0;

        projectCount++;

        emit NewProject(projectCount - 1, projectManager);
    }

    function getCurrentProjectId() public view returns (uint256) {
        return projectCount - 1;
    }

    function createTask(uint256 projectId, uint256 stakedAmount) public {
        require(
            msg.sender == projects[projectId].projectManager,
            "Only project manager can create tasks"
        );

        projects[projectId]
            .tasks[projects[projectId].taskCount]
            .taskId = projects[projectId].taskCount;
        projects[projectId]
            .tasks[projects[projectId].taskCount]
            .stakedAmount = stakedAmount;
        projects[projectId]
            .tasks[projects[projectId].taskCount]
            .completed = false;
        projects[projectId].taskCount++;

        emit NewTask(
            projectId,
            projects[projectId].taskCount - 1,
            stakedAmount
        );
    }

    // function getTasksByProjectId(uint projectId) public view returns (Task[] memory) {
    //     return projects[projectId].tasks;
    // }

    function sendProposal(
        uint256 projectId,
        uint256 taskId,
        uint256 bidAmount,
        string memory motivation
    ) public {
        uint256 proposalCount = projects[projectId].tasks[taskId].proposalCount;
        address selectedWorker = projects[projectId]
            .tasks[taskId]
            .selectedWorker;

        require(
            selectedWorker == address(0),
            "Freelancer has already been selected for this task"
        );

        projects[projectId]
            .tasks[taskId]
            .proposals[proposalCount]
            .freelancer = msg.sender;
        projects[projectId]
            .tasks[taskId]
            .proposals[proposalCount]
            .bidAmount = bidAmount;
        projects[projectId]
            .tasks[taskId]
            .proposals[proposalCount]
            .motivation = motivation;
        projects[projectId].tasks[taskId].proposalCount++;

        emit NewProposal(projectId, taskId, msg.sender, bidAmount);
    }

    function getProposalsByTaskId(uint256 projectId, uint256 taskId)
        public
        view
        returns (Proposal[] memory)
    {
        Proposal[] memory proposals = new Proposal[](
            projects[projectId].tasks[taskId].proposalCount
        );
        for (
            uint256 i = 0;
            i < projects[projectId].tasks[taskId].proposalCount;
            i++
        ) {
            proposals[i] = projects[projectId].tasks[taskId].proposals[i];
        }
        return proposals;
    }

    function selectWorker(
        uint256 projectId,
        uint256 taskId,
        address worker
    ) public {
        require(
            !projects[projectId].tasks[taskId].completed,
            "Task is already completed"
        );

        projects[projectId].tasks[taskId].selectedWorker = worker;
        emit WorkerSelected(projectId, taskId, worker);
    }

    function completeTaskWorker(uint256 projectId, uint256 taskId) public {
        require(
            msg.sender == projects[projectId].tasks[taskId].selectedWorker,
            "Only selected worker can complete the task"
        );

        projects[projectId].tasks[taskId].completed = true;

        emit TaskCompleted(projectId, taskId);
    }

    // function reviewTask(){}

    function releasePayment(uint256 projectId, uint256 taskId) public payable {
        require(
            msg.sender == projects[projectId].projectManager,
            "Only project manager can release payment"
        );
        require(
            projects[projectId].tasks[taskId].completed,
            "Task is not completed yet"
        );

        uint256 stakedAmount = projects[projectId].tasks[taskId].stakedAmount;
        address worker = projects[projectId].tasks[taskId].selectedWorker;

        payable(worker).transfer(stakedAmount);

        emit PaymentReleased(projectId, taskId, worker, stakedAmount);
    }

    // function to get a list of all projects
    function getAllProjects() public view {}
}
