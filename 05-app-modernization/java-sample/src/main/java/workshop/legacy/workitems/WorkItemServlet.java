package workshop.legacy.workitems;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Legacy Java 8 servlet used to demonstrate a Java 21 and Spring Boot migration.
 */
@WebServlet("/api/work-items")
public class WorkItemServlet extends HttpServlet {

    private static final List<String> WORK_ITEMS = Arrays.asList(
        "Document the release process",
        "Add an accessibility check"
    );

    /**
     * Writes a manually assembled JSON response.
     *
     * @param request the HTTP request
     * @param response the HTTP response
     * @throws ServletException when servlet processing fails
     * @throws IOException when the response cannot be written
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter writer = response.getWriter();
        StringBuilder json = new StringBuilder("[");

        for (int index = 0; index < WORK_ITEMS.size(); index++) {
            if (index > 0) {
                json.append(",");
            }
            json.append("{\"id\":")
                .append(index + 1)
                .append(",\"title\":\"")
                .append(WORK_ITEMS.get(index))
                .append("\"}");
        }

        json.append("]");
        writer.print(json.toString());
    }
}
