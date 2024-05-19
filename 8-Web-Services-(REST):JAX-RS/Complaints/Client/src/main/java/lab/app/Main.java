package lab.app;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.MediaType;

public class Main {
    private static final String BASE_URL = "http://localhost:8080/Server-1.0-SNAPSHOT/api/complaints";

    public static void main(String[] args) {
        Client client = ClientBuilder.newClient();

        printAllComplaints(client);
        printComplaint(client, 51);
        updateComplaint(client, 51);
        printOpenComplaints(client);

        client.close();
    }

    private static void printAllComplaints(Client client) {
        String complaints = client.target(BASE_URL)
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);
        System.out.println("All Complaints: " + complaints);
    }

    private static void printComplaint(Client client, int id) {
        String complaint = client.target(BASE_URL + "/" + id)
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);
        System.out.println("Complaint: " + complaint);
    }

    private static void updateComplaint(Client client, int id) {
        String complaint = client.target(BASE_URL + "/" + id)
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);

        String updatedComplaint = complaint.substring(0, complaint.lastIndexOf(":")) + ": \"closed\"}";

        client.target(BASE_URL + "/" + id)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.entity(updatedComplaint, MediaType.APPLICATION_JSON), String.class);

        System.out.println("Updated Complaint: " + updatedComplaint);
    }

    private static void printOpenComplaints(Client client) {
        String openComplaints = client.target(BASE_URL)
                .queryParam("status", "open")
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);
        System.out.println("Open Complaints: " + openComplaints);
    }
}