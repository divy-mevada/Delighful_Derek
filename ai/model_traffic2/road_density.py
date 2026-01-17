import osmnx as ox

def compute_road_density(lat, lon, radius=1000):
    G = ox.graph_from_point((lat, lon), dist=radius, network_type="drive")
    roads = ox.graph_to_gdfs(G, nodes=False)

    score = 0
    for road in roads["highway"]:
        if isinstance(road, list):
            road = road[0]
        if road == "primary":
            score += 3
        elif road == "secondary":
            score += 2
        elif road in ["residential", "tertiary"]:
            score += 1

    return score
