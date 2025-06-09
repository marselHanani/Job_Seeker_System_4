<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Report::query();

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('title', 'like', '%' . $searchTerm . '%')
                  ->orWhere('description', 'like', '%' . $searchTerm . '%');
        }

        if ($request->has('filter') && $request->input('filter') !== 'All Reports') {
            $query->where('type', $request->input('filter'));
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $report = Report::create([
            'title' => $request->title,
            'type' => $request->type,
            'description' => $request->description,
            'last_updated' => now(),
            'icon' => 'fa-file-alt'
        ]);

        return response()->json($report, 201);
    }

    public function show(Report $report)
    {
        return response()->json($report);
    }

    public function update(Request $request, Report $report)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'views' => 'sometimes|integer',
            'downloads' => 'sometimes|integer',
        ]);

        $report->update($request->all());

        return response()->json($report);
    }

    public function destroy(Report $report)
    {
        $report->delete();

        return response()->json(null, 204);
    }

    public function download(Report $report)
    {
        $report->downloads++;
        $report->save();
        // In a real application, you would serve the actual file here.
        // For now, we just increment the download count.
        return response()->json(['message' => 'Report downloaded successfully', 'downloads' => $report->downloads]);
    }

    public function share(Report $report)
    {
        // Logic for sharing the report (e.g., generate a shareable link, send email)
        return response()->json(['message' => 'Report shared successfully']);
    }
}
