# ATS Integration System

A backend system that integrates with an external Applicant Tracking System (ATS), designed with a focus on reliability, bidirectional data flow, asynchronous processing, and data consistency.

---

## Overview

This system manages the flow of candidate data between an external ATS and an internal database, handling ingestion, transformation, internal updates, and outbound synchronization.

Core capabilities include:

* Ingesting candidate data from an external ATS
* Transforming external data into an internal model
* Handling internal mutations via API endpoints
* Propagating updates back to the ATS
* Maintaining consistency between systems

---

## Architecture

The system follows a layered and decoupled architecture:

```text
Inbound:
ATS → Client → Collector → Service → Database

Outbound:
Database → Service → Deliverer → Client → ATS
```

Mutations are triggered via internal API endpoints, which update the database and propagate changes back to the ATS.

Inbound handles external data ingestion, while outbound ensures internal changes are propagated back to the ATS.

Additional components are introduced progressively:

* Webhooks for event-driven updates
* Queue-based processing for asynchronous workflows
* Workers for background execution
* Scheduler for periodic synchronization

---

## System Evolution

The system is built incrementally:

### Phase 1 - Basic Integration

* Synchronous request handling
* Data ingestion and persistence
* Internal mutation APIs
* Outbound updates via API calls

### Phase 2 - Asynchronous Processing

* Introduction of Redis as a queue
* Decoupled event processing using workers

### Phase 3 - Data Synchronization

* Periodic synchronization using a scheduler
* Incremental sync using timestamps/checkpoints
* Handling missed or delayed updates

### Phase 4 - Containerization

* Docker-based setup for consistent environments

---

## Core Components

***Client Layer***
Encapsulates all communication with the external ATS (HTTP interactions).

***Collector (Inbound Mapping)***
Transforms external ATS data into internal domain models.

***Deliverer (Outbound Mapping)***
Maps internal data into ATS-compatible format.

***Service Layer***
Contains business logic and orchestrates interactions between components.

***Mutation API (Internal Tool)***
Exposes endpoints to update candidate data and acts as the source of outbound integration.

***Webhook Handler***
Processes real-time updates from the ATS.

***Queue & Worker (Phase 2)***
Enable asynchronous, decoupled processing of events.

***Scheduler (Phase 3)***
Ensures periodic reconciliation between systems.

---

## Architecture Decisions

**Source of Truth**

* ATS is treated as the source of truth for external candidate data
* Internal system is the source of truth for user-driven mutations (e.g., status updates)

**Idempotency**

* Duplicate events are handled using identifiers such as `eventId` or timestamps
* Prevents reprocessing of the same webhook or queued job

**Retry Strategy**

* Transient failures are retried with backoff
* Failed jobs can be reprocessed safely

**Sync Strategy**

* Incremental sync using `updated_since` timestamps
* Supports pagination and checkpoint-based continuation

**Conflict Resolution**

* Conflicts are resolved using last-updated timestamps, with user-controlled fields taking precedence.

---

## Production Considerations

The following concerns are incorporated progressively:

* Error handling and validation
* Structured logging for observability
* Retry mechanisms for transient failures
* Idempotency handling for duplicate events
* Rate limiting for external API interactions
* Correlation tracking across webhook → queue → worker → outbound
* Dead-letter queue (DLQ) for jobs that fail after maximum retry attempts, allowing inspection and replay
* Webhook signature verification to ensure authenticity of incoming events
* Target reliability: most updates are processed within a short time window (e.g., 99.9% within 5 minutes)

---

## Project Planning

The implementation is tracked using a GitHub Project board:
[Integration System Roadmap](https://github.com/orgs/connecting-systems/projects/1)

---

## Tech Stack

* Node.js
* Express.js
* SQLite / PostgreSQL
* Redis (Phase 2)
* Docker (Phase 4)

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/connecting-systems/integration-system.git
cd integration-system
```

### Install dependencies

```bash
npm install
```

### Run the application

```bash
node index.js
```

---

## Branch Strategy

The system evolves across dedicated branches:

* phase-1-basic-integration
* phase-2-async-redis
* phase-3-data-sync
* phase-4-docker

The `main` branch contains the final integrated system.

---

## Author

Harshita Yadav

Backend & Integration Engineer
