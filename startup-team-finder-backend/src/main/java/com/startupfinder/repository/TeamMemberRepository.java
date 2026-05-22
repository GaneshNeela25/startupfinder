package com.startupfinder.repository;

import com.startupfinder.model.TeamMember;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamMemberRepository
        extends JpaRepository<TeamMember, Long> {

    List<TeamMember> findByTeamId(Long teamId);

    boolean existsByTeamIdAndUserId(
            Long teamId,
            Long userId
    );
}