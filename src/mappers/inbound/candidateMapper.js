function mapCandidate(atsCandidate){ 
    return {
      id: atsCandidate.id,
      name: `${atsCandidate.first_name} ${atsCandidate.last_name}`,
      email: atsCandidate.email,
      phone: atsCandidate.phone,  
      source: atsCandidate.source,
      createdAt: atsCandidate.created_at,
    };
}

function mapCandidates(atsData) {
    return atsData.data.map(mapCandidate);
}  

module.exports = {
  mapCandidate,
  mapCandidates
}