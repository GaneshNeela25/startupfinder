package com.startupfinder.controller;

import com.startupfinder.model.JoinRequest;

import com.startupfinder.repository.JoinRequestRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.startupfinder.model.TeamMember;

import com.startupfinder.repository.TeamMemberRepository;

@RestController
@RequestMapping("/requests")

@CrossOrigin("*")
public class JoinRequestController {

    private final JoinRequestRepository repository;
    private final TeamMemberRepository memberRepository;

    public JoinRequestController(
        JoinRequestRepository repository,
        TeamMemberRepository memberRepository
) {

    this.repository = repository;

    this.memberRepository = memberRepository;
}

    @PostMapping
    public JoinRequest sendRequest(
            @RequestBody JoinRequest request
    ) {

        request.setStatus("PENDING");

        return repository.save(request);
    }

    @GetMapping("/{teamId}")
    public List<JoinRequest> getRequests(
            @PathVariable Long teamId
    ) {

        return repository.findByTeamId(teamId);
    }

    @GetMapping("/user/{userId}")

    public List<JoinRequest> getUserRequests(
        @PathVariable Long userId
) {

    return repository.findByUserId(userId);
}

    @PutMapping("/{id}")
    public JoinRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        JoinRequest request =
                repository.findById(id).orElseThrow();

        request.setStatus(status);

        if (status.equals("APPROVED")) {

    TeamMember member = new TeamMember();

    member.setTeamId(request.getTeamId());

    member.setUserId(request.getUserId());

    member.setUserName(request.getUserName());

    member.setRole(request.getRole());

    memberRepository.save(member);
}

        return repository.save(request);
    }
}