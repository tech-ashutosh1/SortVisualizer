package ashu.algovisuals.AlgoVisuals;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/sort")
@CrossOrigin(origins = "*")  // Allows frontend to call backend
public class SortingController {

    @PostMapping("/bubble")
    public List<int[]> bubbleSort(@RequestBody int[] arr) {
        List<int[]> steps = new ArrayList<>();

        // Bubble sort algorithm with step tracking
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    steps.add(arr.clone()); // Save current step
                }
            }
        }
        return steps;
    }
}
