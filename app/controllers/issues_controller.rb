class IssuesController < ApplicationController

  def index
    @issue = Issue.all
    render json: @issue
  end

  def create
    @issue = Issue.create(name: params[:name])
    render json: @issue
  end

  def update
    @issue = Issue.find(params[:id])
    @issue.update_attributes(name: params[:name])
    render json: @issue
  end

  def destroy
    @issue = Issue.find(params[:id])
    if @issue.destroy
      head :no_content, status: :ok
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end
end
