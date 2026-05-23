package com.startupfinder.controller;

import com.startupfinder.model.Team;
import com.startupfinder.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    // GET ALL TEAMS
    @GetMapping
    public List<Team> getAllTeams() {

        return teamRepository.findAll();

    }

    // CREATE TEAM
    @PostMapping("/create")
    public Team createTeam(
            @RequestBody Team team
    ) {

        return teamRepository.save(team);

    }

}