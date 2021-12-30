package com.lewis.lewis.repository;

import com.lewis.lewis.entity.PlaylistEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends CrudRepository<PlaylistEntity, Long> {
}
