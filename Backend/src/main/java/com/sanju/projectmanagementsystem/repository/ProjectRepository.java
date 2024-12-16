package com.sanju.projectmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sanju.projectmanagementsystem.modal.Project;
import com.sanju.projectmanagementsystem.modal.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // List<Project> findByOwner(User user);

    List<Project> findByNameContainingAndTeamContains(String partialName,User user);

    // @Query("select p from Project p join p.team t where t=:user")
    // List<Project>findProjectByTeam(@Param("user") User user);

    List<Project> findByTeamContainingOrOwner(User user,User owner);
}
