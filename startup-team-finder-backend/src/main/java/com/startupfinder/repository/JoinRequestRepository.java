package com.startupfinder.repository;

import com.startupfinder.model.JoinRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JoinRequestRepository
        extends JpaRepository<JoinRequest, Long> {

    List<JoinRequest> findByTeamId(Long teamId);
    List<JoinRequest> findByUserId(Long userId);
}