function mapCandidate(candidate) {
  const [firstName, lastName] = candidate.name.split(" ");

  return {
    id: candidate.id,
    first_name: firstName,
    last_name: lastName || "",
    email: candidate.email,
    phone: candidate.phone,
    source: candidate.source,
    created_at: candidate.createdAt,
  };
}

function mapCandidates(candidates) {
return candidates.map(mapCandidate);
}

module.exports = {
  mapCandidate,
  mapCandidates,
}