<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;

class EmployerController extends Controller
{
    public function index()
    {
        $employers = Employer::with('user')->get();
        return response()->json($employers);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Approved,Rejected',
        ]);

        $employer = Employer::findOrFail($id);
        $employer->status = $request->status;
        $employer->save();

        return response()->json(['message' => 'Status updated successfully', 'employer' => $employer]);
    }
}
