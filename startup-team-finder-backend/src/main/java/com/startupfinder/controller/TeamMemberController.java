package com.startupfinder.controller;

import com.startupfinder.model.TeamMember;

import com.startupfinder.repository.TeamMemberRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")

@CrossOrigin("*")
public class TeamMemberController {

    private final TeamMemberRepository repository;

    public TeamMemberController(
            TeamMemberRepository repository
    ) {

        this.repository = repository;
    }

    @GetMapping("/{teamId}")
    public List<TeamMember> getMembers(
            @PathVariable Long teamId
    ) {

        return repository.findByTeamId(teamId);
    }
}