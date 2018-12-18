package it.nicolasanti.service;

import it.nicolasanti.domain.Utente;
import it.nicolasanti.repository.UtenteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Utente.
 */
@Service
@Transactional
public class UtenteService {

    private final Logger log = LoggerFactory.getLogger(UtenteService.class);

    private final UtenteRepository utenteRepository;

    public UtenteService(UtenteRepository utenteRepository) {
        this.utenteRepository = utenteRepository;
    }

    /**
     * Save a utente.
     *
     * @param utente the entity to save
     * @return the persisted entity
     */
    public Utente save(Utente utente) {
        log.debug("Request to save Utente : {}", utente);
        return utenteRepository.save(utente);
    }

    /**
     * Get all the utentes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Utente> findAll() {
        log.debug("Request to get all Utentes");
        return utenteRepository.findAll();
    }


    /**
     * Get one utente by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Utente> findOne(Long id) {
        log.debug("Request to get Utente : {}", id);
        return utenteRepository.findById(id);
    }

    /**
     * Delete the utente by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Utente : {}", id);
        utenteRepository.deleteById(id);
    }
}
