package it.nicolasanti.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.nicolasanti.domain.Utente;
import it.nicolasanti.service.UtenteService;
import it.nicolasanti.web.rest.errors.BadRequestAlertException;
import it.nicolasanti.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Utente.
 */
@RestController
@RequestMapping("/api")
public class UtenteResource {

    private final Logger log = LoggerFactory.getLogger(UtenteResource.class);

    private static final String ENTITY_NAME = "utente";

    private final UtenteService utenteService;

    public UtenteResource(UtenteService utenteService) {
        this.utenteService = utenteService;
    }

    /**
     * POST  /utentes : Create a new utente.
     *
     * @param utente the utente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new utente, or with status 400 (Bad Request) if the utente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/utentes")
    @Timed
    public ResponseEntity<Utente> createUtente(@Valid @RequestBody Utente utente) throws URISyntaxException {
        log.debug("REST request to save Utente : {}", utente);
        if (utente.getId() != null) {
            throw new BadRequestAlertException("A new utente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Utente result = utenteService.save(utente);
        return ResponseEntity.created(new URI("/api/utentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /utentes : Updates an existing utente.
     *
     * @param utente the utente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated utente,
     * or with status 400 (Bad Request) if the utente is not valid,
     * or with status 500 (Internal Server Error) if the utente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/utentes")
    @Timed
    public ResponseEntity<Utente> updateUtente(@Valid @RequestBody Utente utente) throws URISyntaxException {
        log.debug("REST request to update Utente : {}", utente);
        if (utente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Utente result = utenteService.save(utente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, utente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /utentes : get all the utentes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of utentes in body
     */
    @GetMapping("/utentes")
    @Timed
    public List<Utente> getAllUtentes() {
        log.debug("REST request to get all Utentes");
        return utenteService.findAll();
    }

    /**
     * GET  /utentes/:id : get the "id" utente.
     *
     * @param id the id of the utente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the utente, or with status 404 (Not Found)
     */
    @GetMapping("/utentes/{id}")
    @Timed
    public ResponseEntity<Utente> getUtente(@PathVariable Long id) {
        log.debug("REST request to get Utente : {}", id);
        Optional<Utente> utente = utenteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(utente);
    }

    /**
     * DELETE  /utentes/:id : delete the "id" utente.
     *
     * @param id the id of the utente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/utentes/{id}")
    @Timed
    public ResponseEntity<Void> deleteUtente(@PathVariable Long id) {
        log.debug("REST request to delete Utente : {}", id);
        utenteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
