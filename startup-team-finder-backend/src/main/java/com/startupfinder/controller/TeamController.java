package com.startupfinder.controller;

import com.startupfinder.model.Team;
import com.startupfinder.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
@CrossOrigin("*")
public class TeamController {

    @Autowired
    TeamRepository teamRepository;

    @PostMapping
    public Team createTeam(@RequestBody Team team) {
        return teamRepository.save(team);
    }

    @GetMapping
    public List<Team> getTeams() {
        return teamRepository.findAll();
    }

    @GetMapping("/owner/{ownerId}")

    public List<Team> getTeamsByOwner(
        @PathVariable Long ownerId
) {

    return teamRepository.findByOwnerId(ownerId);
}
}