package com.startupfinder.model;

import jakarta.persistence.*;

@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teamName;

    private String projectIdea;

    private String requiredSkills;

    private Long ownerId;

    private String ownerSkills;

    public Team() {
    }

    public Long getId() {
        return id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getProjectIdea() {
        return projectIdea;
    }

    public void setProjectIdea(String projectIdea) {
        this.projectIdea = projectIdea;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerSkills() {
        return ownerSkills;
    }

    public void setOwnerSkills(String ownerSkills) {
        this.ownerSkills = ownerSkills;
    }
}