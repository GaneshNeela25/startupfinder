package com.startupfinder.repository;

import com.startupfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailAndPassword(String email, String password);

    List<User> findBySkillsContainingIgnoreCase(String skills);

    List<User> findBySkillsContainingIgnoreCaseAndIdNot(
        String skill,
        Long id
    );

}